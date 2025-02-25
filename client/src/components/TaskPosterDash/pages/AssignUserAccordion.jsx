import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const users = [
  {
    name: "Joseph Doe",
    location: "Santa Ana, CA",
    avatar: "https://via.placeholder.com/40", // Replace with real image URL
  },
  {
    name: "Joseph Doe",
    location: "Huntington, IN",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Joseph Doe",
    location: "Wilmington, WA",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Joseph Doe",
    location: "Illios, IL",
    avatar: "https://via.placeholder.com/40",
  },
];

const AssignUserAccordion = () => {
  return (
    <Box width="230px" margin="2rem auto">
      <Accordion
        defaultExpanded
        sx={{
          backgroundColor: "#080815", // Dark background
          color: "#fff",           // White text
          borderRadius: 1,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}>
          <Typography fontWeight="bold">Assign Users</Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ backgroundColor: "#080815" }}>
          <List>
            {users.map((user, index) => (
              <ListItem key={index} sx={{ color: "#fff" }}>
                {/* Avatar (User Image) */}
                <ListItemAvatar>
                  <Avatar src={user.avatar} alt={user.name} />
                </ListItemAvatar>

                {/* Name & Location */}
                <ListItemText
                  primary={user.name}
                  secondary={user.location}
                  primaryTypographyProps={{ color: "#fff" }}
                  secondaryTypographyProps={{ color: "#ccc" }}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AssignUserAccordion;
