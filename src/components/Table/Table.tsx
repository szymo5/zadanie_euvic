import * as React from 'react';
import { useDispatch } from 'react-redux';
import { alpha } from '@mui/material/styles';
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { groupDelete, singleDelete } from '../../redux/people';

import {selectLanguage} from '../../utils/selectLanguage';
import {tableText, generalText} from '../../utils/translateText';

import {truncateDesc} from '../../utils/truncateDesc';


interface Data {
  name: string;
  age: number;
  date: string;
  description: string;
}


interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  language: string
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { onSelectAllClick, numSelected, rowCount, language } = props;

  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }
  
  const headCells: readonly HeadCell[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: selectLanguage(generalText.textName, language),
    },
    {
      id: 'age',
      numeric: true,
      disablePadding: false,
      label: selectLanguage(generalText.textAge, language),
    },
    {
      id: 'date',
      numeric: true,
      disablePadding: false,
      label: selectLanguage(generalText.textDate, language),
    },
    {
      id: 'description',
      numeric: true,
      disablePadding: false,
      label: selectLanguage(generalText.textBio, language),
    }
  ];
  
  return (
    <TableHead>
      <TableRow sx={{backgroundColor: '#555'}}>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            sx={{color: '#fff'}}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sx={{color: '#fff', fontWeight: '700'}}
          >
              {headCell.label}
          </TableCell>
        ))}
        <TableCell
            key='actions'
            align='right'
            padding='normal'
            sx={{color: '#fff', fontWeight: '700'}}
        >
            {selectLanguage(tableText.headCellsLabelActions, language)}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: string[];
  setSelected: ([]: string[]) => void;
  language: string
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, selected, setSelected, language } = props;

  const dispatch = useDispatch();

  const groupRowsDelete = (rows: string[]) => {
    dispatch(groupDelete(rows));
    setSelected([]);
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {
        <Typography
          sx={{ flex: '1 1 100%', fontFamily: 'Lato'}}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {`${selectLanguage(tableText.toolbarSelected, language)} ${numSelected}`}
        </Typography>
      }
      {numSelected > 0 && (
        <Tooltip title={selectLanguage(generalText.textDelete, language)}>
          <IconButton onClick={() => groupRowsDelete(selected)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) }
    </Toolbar>
  );
}

interface MainTableProps {
  language: string;
  setCurrentId: (id: string) => void;
}

export default function EnhancedTable({language, setCurrentId}: MainTableProps) {
    const {people} = useSelector((state: RootState) => state.people)
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const dispatch = useDispatch();

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = people.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected:  string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - people.length) : 0;

    const visibleRows = people.slice((page * rowsPerPage), (page * rowsPerPage + rowsPerPage));

    const singleRowDelete = (id:string) => {
      dispatch(singleDelete(id))
      setSelected([]);
    }

    function defaultLabelDisplayedRows({ from, to, count }:any) {
      return `${from}–${to} ${selectLanguage(tableText.paginationLabelDisplay, language)} ${count !== -1 ? count : `${selectLanguage(tableText.paginationLabelDisplayMore, language)} ${to}`}`;
    }

    return (
        <Box sx={{ width: '800px', margin: '150px auto 0 auto' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={people.length}
                            language={language}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                onClick={(event) => handleClick(event, row.id)}
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.age}</TableCell>
                                        <TableCell align="right">{row.date}</TableCell>
                                        <TableCell align="right">{truncateDesc(row.description)}</TableCell>
                                        <TableCell align='right'>
                                            <Tooltip title={selectLanguage(generalText.textDelete, language)}>
                                                <IconButton onClick={() => {singleRowDelete(row.id)}}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={selectLanguage(generalText.textEdit, language)}>
                                                <IconButton onClick={() => setCurrentId(row.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={people.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={selectLanguage(tableText.paginationRowsPerPage, language)}
                    labelDisplayedRows={defaultLabelDisplayedRows}
                />
                <EnhancedTableToolbar numSelected={selected.length} selected={selected} setSelected={setSelected} language={language}/>
            </Paper>
        </Box>
    );
}
