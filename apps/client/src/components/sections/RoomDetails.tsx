interface IRoomDetails {
  imgs: string[];
  title: string;
  description: string;
  capacity: number;
  price: number;
}

interface IRoomDetailsProps {
  room: IRoomDetails;
  onClose: () => void;
}

export const RoomDetails = ({ room, onClose }: IRoomDetailsProps) => {
  // bloqueia scroll enquanto o modal estiver aberto

  return (
    <section className="">
      RoomDetails
      <p onClick={onClose}>X</p>
    </section>
  );
};
