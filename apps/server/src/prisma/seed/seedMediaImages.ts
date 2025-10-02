// Importa o cliente Supabase configurado e enums do Prisma
import { supabase } from '../../shared/supabaseClient.js';
import { PrismaClient, MediaCategory, RoomCategory } from '@prisma/client';

// Cria instância do Prisma para acessar o banco de dados
const prisma = new PrismaClient();

// Nome do bucket no Supabase Storage onde as imagens estão armazenadas
const bucketName = 'images-hotel';

/**
 * Função recursiva para listar todos os arquivos de um bucket, incluindo subpastas
 * @param path Caminho dentro do bucket. Padrão é '' (raiz do bucket)
 * @returns Array de strings com os caminhos completos de todos os arquivos encontrados
 */
async function listAllFiles(path = ''): Promise<string[]> {
  // Lista itens (arquivos e pastas) no caminho fornecido
  const { data: items, error } = await supabase.storage
    .from(bucketName)
    .list(path, { limit: 100 }); // limita a 100 itens por chamada

  // Se ocorrer erro ao listar, mostra no console e retorna array vazio
  if (error) {
    console.error('Erro ao listar arquivos em', path, error);
    return [];
  }

  // Se não houver itens, retorna array vazio
  if (!items || items.length === 0) return [];

  // Array que irá armazenar apenas arquivos
  const files: string[] = [];

  // Percorre cada item retornado pelo Supabase
  for (const item of items) {
    // Cria o caminho completo do item, considerando subpastas
    const itemPath = path ? `${path}/${item.name}` : item.name;

    if (item.id) {
      // Se 'id' existe → é um arquivo → adiciona ao array
      files.push(itemPath);
    } else {
      // Se 'id' é null → é uma pasta → chama recursivamente para listar arquivos dentro
      const nestedFiles = await listAllFiles(itemPath);
      // Adiciona todos os arquivos encontrados dentro da pasta
      files.push(...nestedFiles);
    }
  }

  // Retorna todos os arquivos encontrados
  return files;
}

/**
 * Função principal do seed que insere imagens no banco de dados
 */
export async function seedMediaImages() {
  console.log('Iniciando seed de imagens...');

  // Lista todos os arquivos do bucket, incluindo subpastas
  const allFiles = await listAllFiles('');

  // Se não houver arquivos, finaliza a função
  if (allFiles.length === 0) {
    console.log('Nenhum arquivo encontrado no bucket.');
    return;
  }

  // Percorre todos os arquivos encontrados
  for (const filePath of allFiles) {
    // Gera a URL pública do arquivo no Supabase
    const publicUrl = supabase.storage.from(bucketName).getPublicUrl(filePath).data.publicUrl;

    // Determina a categoria da imagem pela primeira pasta do caminho
    // Ex: 'room/luxury/quarto1.jpg' → primeira pasta = 'room'
    const firstFolder = filePath.includes('/') ? filePath.split('/')[0] : 'root';
    let category: MediaCategory;

    switch (firstFolder.toLowerCase()) {
      case 'room':
        category = MediaCategory.ROOM;
        break;
      case 'hotel':
        category = MediaCategory.HOTEL;
        break;
      case 'restaurant':
        category = MediaCategory.RESTAURANT;
        break;
      case 'activities':
        category = MediaCategory.ACTIVITY;
        break;
      default:
        // Arquivos fora das pastas conhecidas → considera ACTIVITY
        category = MediaCategory.ACTIVITY;
        break;
    }

    // Determina o roomTypeId se a imagem for categoria ROOM
    let roomTypeId: string | undefined = undefined;
    if (category === MediaCategory.ROOM) {
      // A segunda pasta indica o tipo do quarto
      // Ex: 'room/luxury/quarto1.jpg' → 'luxury'
      const roomTypeName = filePath.split('/')[1];
      if (roomTypeName) {
        // Busca o RoomType correspondente no banco usando o enum RoomCategory
        const roomType = await prisma.roomType.findUnique({
          where: { category: roomTypeName.toUpperCase() as RoomCategory },
        });
        // Se encontrado, atribui o id ao roomTypeId
        if (roomType) roomTypeId = roomType.id;
      }
    }

    // Insere ou atualiza a imagem no banco usando upsert
    await prisma.mediaImage.upsert({
      where: { url: publicUrl }, // verifica se a URL já existe no banco
      update: {}, // não atualiza nada se já existir
      create: {
        url: publicUrl, // URL pública da imagem
        title: filePath.split('/').pop() || 'untitled', // nome do arquivo como título
        category, // categoria da imagem
        roomTypeId, // id do tipo de quarto se aplicável
      },
    });

    // Log do progresso
    console.log('Inserido:', publicUrl);
  }

  // Mensagem final indicando que o seed terminou
  console.log('Seed de imagens finalizado! 🎉');
}
