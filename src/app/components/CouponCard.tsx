import { Card } from '@mui/material';
import { CardHeader } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardActions } from '@mui/material';
import { Avatar } from '@mui/material';
import { Typography } from '@mui/material';

export default function CouponCard(
    {brandName, expiryDate, description, image}:{brandName:string, expiryDate:string, description:string, image:string}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar src = "">
                    R
                    </Avatar>
                }
                title = {brandName}
                subheader = {"Expires:" + expiryDate}
            />
            <CardMedia
                sx={{ height: 100}}
                component="img"
                image={image}
                alt={brandName}
            />
            <CardContent>
                <Typography>
                    {description}
                </Typography>
            </CardContent>
            

        </Card>
    );
}