import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import BusinessImg from '../assets/images/business-card.svg';
import EducationImg from '../assets/images/education.svg';
import ExpenseImg from '../assets/images/expense.svg';
import SalesImg from '../assets/images/sales.svg';
import OthersImg from '../assets/images/other.svg';
import LineChartImg from '../assets/images/line-chart.svg';
import PieChartImg from '../assets/images/pie-chart.svg';
import BarChartImg from '../assets/images/bar-chart.svg';

export default function CustomCard({
  cardName,
  cardDesc,
  type,
  action = 'display',
  handleClickOpen,
  handleDelete,
  handleViewChart,
  imgType,
  cardData,
}) {
  const renderImg = () => {
    switch (imgType) {
      case 'Education':
        return EducationImg;
      case 'Expense':
        return ExpenseImg;
      case 'Sales':
        return SalesImg;
      case 'Business':
        return BusinessImg;
      case 'line':
        return LineChartImg;
      case 'pie':
        return PieChartImg;
      case 'bar':
        return BarChartImg;
      case 'Others':
        return OthersImg;
      default:
        return OthersImg;
    }
  };

  if (action === 'add') {
    return (
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="button"
          sx={{
            height: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={handleClickOpen}
        >
          <AddIcon sx={{ fontSize: '128px' }} />
        </CardMedia>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            Add New
            {' '}
            {type === 'report' ? 'Report' : 'Chart'}
          </Typography>
          {type === 'report' ? (
            <Typography>
              New Report, which can be used to generate Dashboard with Charts
            </Typography>
          ) : (
            <Typography>
              New Chart, which can be used to create Dashboard
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardMedia
        component="img"
        sx={{
          maxHeight: '200px',
          objectFit: 'none',
        }}
        image={renderImg()}
        alt="random"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {cardName}
        </Typography>
        {cardDesc && (
          <Typography>
            {cardDesc}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {type === 'report'
          ? <Button size="small">Edit</Button>
          : (
            <Button
              size="small"
              onClick={() => handleViewChart(cardData)}
            >
              View
            </Button>
          )}
        <Button size="small" onClick={handleDelete}>Delete</Button>
      </CardActions>
    </Card>
  );
}
