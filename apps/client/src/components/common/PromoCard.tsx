import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

type PromoCardProps = {
  title: string;
  subtitle: string;
  badgeText: string;
  className?: string;
};

export const PromoCard = ({
  title,
  subtitle,
  badgeText,
  className,
}: PromoCardProps) => {
  return (
    <Card
      className={className}
      sx={{
        width: { xs: 350, sm: 400 },
        borderRadius: 3,
        boxShadow: 6,
        overflow: "visible",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        p: 2, // adiciona padding interno
      }}
      aria-label={`Promoção: ${title}`}
    >
      {/* Badge */}
      <Chip
        label={badgeText}
        sx={{
          backgroundColor: badgeText.includes("Pacote") ? "#c78d38" : "#5a4030",
          color: "#f5f5f5",
          position: "absolute",
          left: 16,
          top: 10,
          zIndex: 3,
          fontWeight: 700,
          px: 1.5,
        }}
      />

      {/* Conteúdo */}
      <CardContent sx={{ pt: 4, pb: 3 }}>
        {" "}
        {/* pt maior para não sobrepor o badge */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
