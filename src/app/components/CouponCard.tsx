import { Card } from '@mui/material';
import { CardHeader } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardActions } from '@mui/material';
import { Avatar } from '@mui/material';

export default function CouponCard({description}:{description:string}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title = {description}
            />
            

        </Card>
    );
}