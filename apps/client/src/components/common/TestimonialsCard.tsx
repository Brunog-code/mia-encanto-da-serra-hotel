import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Rating,
} from "@mui/material";

interface ITestimonialsCard {
  nameUser: string;
  avatar: string;
  comment: string;
  rating: number;
  date: string;
  className?: string;
}

export const TestimonialsCard = ({
  nameUser,
  avatar,
  comment,
  rating,
  date,
  className,
}: ITestimonialsCard) => {
  return (
    <Card sx={{ maxWidth: 300, margin: 2 }} className={className}>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        title={nameUser}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ pb: 2 }}>
          {comment}
        </Typography>
        <Rating value={rating} readOnly />
      </CardContent>
    </Card>
  );
};
