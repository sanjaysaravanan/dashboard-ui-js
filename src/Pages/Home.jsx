/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/default-props-match-prop-types */
import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { v4 } from 'uuid';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, ButtonBase, Dialog, DialogContent, DialogTitle, Fab, Grid, Paper, Tooltip, Button,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import '../App.css';
import GraphBlock from '../Components/Charts/GraphBlock';
import MiniChartCard from '../Components/MiniChartCard';

import {
  loadCharts, saveLayout, loadLayout,
} from '../state/actions';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function Home(props) {
  const dispatch = useDispatch();

  const chartsData = useSelector(({ charts }) => charts.charts);
  const layoutData = useSelector(({ dashboard }) => dashboard);

  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState((layoutData.items || []));
  const [edit, setEdit] = useState(false);
  const [layout, setLayout] = useState(layoutData.layout);
  const [newChartOpen, setNewChartOpen] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  const [state, setState] = useState({
    currentBreakpoint: 'lg',
    compactType: 'vertical',
    layouts: layoutData.layouts,
  });

  const handleCloseNewCharts = () => {
    setNewChartOpen(false);
    setSelectedCards([]);
  };

  const addChartBlocks = () => {
    const addLayout = {
      x: 0,
      y: 99,
      w: 4,
      h: 7,
      minW: 4,
      minH: 7,
    };

    const newCHarts = selectedCards.map((chartId, i) => {
      const blockId = v4().toString();
      return {
        ...addLayout,
        i: blockId,
        chartId,
      };
    });

    setState({
      ...state,
      layouts: {
        lg: [...(state.layouts?.lg || []), ...newCHarts],
        md: [...(state.layouts?.md || []), ...newCHarts],
        sm: [...(state.layouts?.sm || []), ...newCHarts],
      },
    });
    setLayout([...layout, ...newCHarts]);
    setItems([...(items || []), ...newCHarts]);
    setEdit(true);
    handleCloseNewCharts();
  };

  const handleDeleteChart = (layoutId) => {
    console.log(layoutId);
    setItems(items.filter((obj) => obj.i !== layoutId));
  };

  const onBreakpointChange = (breakpoint) => {
    setState({
      ...state,
      currentBreakpoint: breakpoint,
    });
  };

  const onLayoutChange = (changedlayout, layouts) => {
    console.log('new layout', changedlayout);
    const lItems = [...items];
    console.log(lItems);
    setLayout(d => changedlayout);
    /* setState((tempState) =>({
      ...tempState,
      layouts,
    })); */
  };

  const renderResizeHandle = edit ? <span className="react-resizable-handle" /> : <span />;

  const handleSelectCards = (chartId) => {
    if (selectedCards.includes(chartId)) {
      setSelectedCards(selectedCards.filter((objId) => objId !== chartId));
    } else { setSelectedCards([...selectedCards, chartId]); }
  };

  const handleSave = () => {

    const nItems = [];

    for(let item of items) {
      const lItem = layout.find(chart => chart.i === item.chartId);
      const nItem = {
        ...item,
        h: lItem.h,
        x: lItem.x,
        w: lItem.w,
        y: lItem.y,
      }
      nItems.push(nItem)
    }

    dispatch(saveLayout({
      items: nItems,
      layout,
      layouts: {...state.layouts, [state.currentBreakpoint]: layout},
    }));
    setEdit(false);
  };

  const generateDOM = () => _.map(items, (l) => (
    <Paper
      key={l.chartId}
      data-grid={l}
    >
      <GraphBlock
        chartId={l.chartId}
        edit={edit}
        handleDeleteChart={() => handleDeleteChart(l.i)}
      />
    </Paper>
  ));

  useEffect(() => {
    if (!mounted) {
      dispatch(loadCharts());
    }
    dispatch(loadLayout());
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    setItems(layoutData.items);
    /* setLayout(layoutData.layout);
    setState({
      ...state,
      layouts: layoutData.layouts,
    }); */
  }, [layoutData]);

  return (
    <Box p={1}>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mr={1} mb={1}>
        {edit && (
          <Tooltip
            title="Save Layout"
            key="save"
          >
            <Fab
              color="primary"
              aria-label="save"
              onClick={handleSave}
              size="small"
              sx={{
                mx: 1,
              }}
            >
              <SaveIcon />
            </Fab>
          </Tooltip>
        )}
        <Tooltip
          title="Add Chart"
          key="add"
        >
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => { setNewChartOpen(true); }}
            size="small"
            sx={{
              mx: 1,
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <Tooltip
          title="Edit Layout"
          key="edit"
        >
          <Fab
            color="primary"
            aria-label="edit"
            onClick={() => { setEdit(true); }}
            size="small"
            sx={{
              mx: 1,
            }}
          >
            <EditIcon />
          </Fab>
        </Tooltip>
      </Box>
      <div style={{ minWidth: '1200px' }}>
        {console.log('rendering')}
        <ResponsiveReactGridLayout
          {...props}
          layout={layout}
          resizeHandle={renderResizeHandle}
          isDraggable={edit}
          isResizable={edit}
          isDroppable={edit}
          layouts={state.layouts}
          onBreakpointChange={onBreakpointChange}
          onLayoutChange={onLayoutChange}
        >
          {generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
      <Dialog
        open={newChartOpen}
        aria-labelledby="new-chart-dialog"
        aria-describedby="new-chart-dialog"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title">
          <Box display="flex" justifyContent="space-between">
            Add New Charts
            <ButtonBase onClick={handleCloseNewCharts}>
              <CloseIcon />
            </ButtonBase>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            height="350px"
            width="500px"
            overflow="auto"
            sx={{
              '&::-webkit-scrollbar': {
                width: '0em',
              },
            }}
          >
            <Grid container spacing={2} mb={1}>
              {chartsData.map((chart) => (
                <MiniChartCard
                  type={chart.type}
                  name={chart.name}
                  highlight={selectedCards.includes(chart.id)}
                  handleSelect={handleSelectCards}
                  chartId={chart.id}
                  key={chart.id}
                />
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewCharts}>Cancel</Button>
          <Button onClick={addChartBlocks}>Add Charts</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

Home.defaultProps = {
  className: 'layout',
  rowHeight: 30,
  cols: {
    lg: 12, md: 12, sm: 9, xs: 4, xxs: 2,
  },
  initialLayout: [],
};
