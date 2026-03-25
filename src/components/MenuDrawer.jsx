import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { SwipeableDrawer, useMediaQuery, Box, Button, useTheme } from '@mui/material';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
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

const MenuDrawer = ({
    user,
    onLogout,
    swipeAreaWidth = 32
}) => {

    const [activeView, setActiveView] = useState("All");
	const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    
    const theme = useTheme();
    const showPuller = useMediaQuery(theme.breakpoints.down('sm'));
    
	let navClass;
    const anchor = 'top';
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

	const publicNav = [];
	const authNav = ["Dashboard" , "Services"];
	const navItems = user ? authNav : publicNav;

	const handleViewClick = (view) => {
		handleClose(true);
        setActiveView(view);

		const routeMap = {
			About: "/about",
			Contact: "/contact",
			Services: "/services",
			Dashboard: "/dashboard",
		};

		const path = routeMap[view];
		if (path) navigate(path);
	};

	const handleConnectClick = () => {
		if (user) {
			if (onLogout) onLogout();
			navigate("/connection");
		} else {
			navigate("/connection");
		}
	};

	{user ? navClass="nav-hamburger-button log-out" : navClass="nav-hamburger-button log-in"}

    return (
        <div className="nav-hamburger menu-drawer-button">
            <IconButton 
                onClick={handleOpen}
                aria-label="menu"
            >
                <MenuIcon />
            </IconButton>
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
                        height: anchor === 'top' || anchor === 'bottom' ? 225 : '100%',
                        p: 2,
                    }}
                >
                <div>
                    <IconButton
                    className="nav-hamburger-closer"
                        onClick={handleClose}
                    >
                        <CancelIcon />
                    </IconButton>
					{navItems.map((view) => (
						<Button
                            fullWidth
							key={view}
							className={`nav-hamburger-button ${activeView === view ? "active" : ""}`}
							onClick={() => handleViewClick(view)}
                            variant="contained"
						>
							{view}
						</Button>
					))}

					<Button
                        fullWidth
                        variant="contained"
                        className={navClass}
                        onClick={handleConnectClick}
                    >
                        {user ? "Log Out" : "Log In"}
					</Button>
				</div>

                </Box>
            </SwipeableDrawer>
        </div>
    );
};

export default MenuDrawer;