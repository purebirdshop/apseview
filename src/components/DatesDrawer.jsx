import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import SyncIcon from '@mui/icons-material/Sync';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { SwipeableDrawer, useMediaQuery, Box, Button, useTheme } from '@mui/material';
import { useDateController } from "../hooks/useDateController";
import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);

const Puller = styled('div')(({ show, theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: "#DDD",
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    display: show ? 'block' : 'none',
    left: 'calc(50% - 15px)',
    ...theme.applyStyles('dark', {
        backgroundColor: "#abc",
    })
}));



const DatesDrawer = ({
    swipeAreaWidth = 32,
    selectedStart,
    selectedEnd
}) => {

    const { startDate, endDate, setDates } = useDateController();
    const [open, setOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // md = 900px by default
    const showPuller = useMediaQuery(theme.breakpoints.down('sm'));

    const anchor = isMobile ? 'bottom' : 'right';
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const calendarDate = startDate ? dayjs(startDate) : null;
    
    const [selectedWeek, setSelectedWeek] = React.useState(null);
    const handleSelectWeek = (day) => {
        // Set Sunday as start
        const startOfWeek = day.weekday(0); // 0 = Sunday
        const endOfWeek = day.weekday(6);   // 6 = Saturday

        setSelectedWeek({ start: startOfWeek, end: endOfWeek });
        
        setDates(startOfWeek.format('YYYY-MM-DD'), endOfWeek.format('YYYY-MM-DD'));
        handleClose();
    };

    const handleNewStartDate = (newDate) => {
        const start = newDate.format("YYYY-MM-DD");
        const end = newDate.format("YYYY-MM-DD");
        setDates(start, end);
        handleClose();
    };

    const handleMonthDates = () => {
        if (!calendarDate) return;

        const year = calendarDate.year();
        const month = calendarDate.month();

        const firstOfMonth = dayjs(new Date(year, month, 1));
        const lastOfMonth = dayjs(new Date(year, month + 1, 0));

        const firstStr = firstOfMonth.format("YYYY-MM-DD");
        const lastStr = lastOfMonth.format("YYYY-MM-DD");

        setDates(firstStr, lastStr);
        handleClose();
    };

    return (
        <div className="date-drawer-button">
            <Button
                color="primary"
                variant="contained"
                onClick={handleOpen}
                sx={{ mb: 1 }}
            >
                {selectedStart}–{selectedEnd}
            </Button>
                    <Puller show={showPuller}/>

            <SwipeableDrawer
                anchor={anchor}
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                swipeAreaWidth={swipeAreaWidth}
                disableBackdropTransition={false}
                disableDiscovery={false}
                keepMounted
            >
                <Box
                    className='dates-drawer'
                    sx={{
                        left:50,
                        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400,
                        height: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100%',
                        p: 2,
                    }}
                >
                    <Button
                        className='view-this-month'
                        variant="contained"
                        onClick={handleMonthDates}
                        sx={{ mb: 1 }}
                    >
                        View month
                    </Button>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <DateCalendar
                                value={calendarDate}
                                referenceDate={calendarDate}
                                onChange={handleNewStartDate}
                                slots={{
                                    day: (props) => {
                                        // Check if the current day in the loop is Saturday (day 6)
                                        const isSaturday = props.day.day() === 6;
                                        
                                        return (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <PickersDay {...props} />
                                            {isSaturday && (
                                            <Button
                                                size="small"
                                                variant="text"
                                                onClick={() => handleSelectWeek(props.day)}
                                                sx={{ 
                                                    marginLeft:'-10px',
                                                    marginRight:'-16px',
                                                    fontSize: '0.7rem',
                                                    minWidth: 'auto'
                                                }}
                                                endIcon={<SyncIcon />}
                                            />
                                            )}
                                        </Box>
                                        );
                                    },
                                    dayHeader: (props) => {
                                        const isSaturday = props.day.day() === 6;

                                        return (
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {isSaturday && (
                                            <Button
                                                size="small"
                                                variant="text"
                                                sx={{ marginLeft: 1, fontSize: '0.7rem', minWidth: 'auto' }}
                                                endIcon={<SyncIcon />}
                                            />
                                            )}
                                        </Box>
                                        )
                                    }
                                }}
                                slotProps={{
                                    dayHeader: {
                                        sx: {
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '2.5em',
                                        },
                                    },
                                }}
                            />
                        </div>
                    </LocalizationProvider>
                </Box>
            </SwipeableDrawer>
        </div>
    );
};

export default DatesDrawer;