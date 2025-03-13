import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/** Sample priority data */
const priorities = [
  { label: "Highest Priority", color: "#f44336", value: 75 },
  { label: "High Priority", color: "#ff9800", value: 60 },
  { label: "Normal Priority", color: "#4caf50", value: 40 },
  { label: "Low Priority", color: "#009688", value: 20 },
];

const PriorityBar = () => {
  return (
    <Box width="100%" margin="2rem auto">
      <Accordion defaultExpanded sx={{ color:"black"}}>
        {/* Accordion Summary (the clickable header) */}
        <AccordionSummary expandIcon={<ExpandMoreIcon  sx={{color:"#fff"}}/>}>
          <Typography fontWeight="bold">Completed Status</Typography>
        </AccordionSummary>

        {/* Accordion Details (the collapsible content) */}
        <AccordionDetails>
          {priorities.map((item) => (
            <Box key={item.label} mb={2}>
              {/* Label */}
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                {item.label}
              </Typography>

              {/* Gray background bar */}
              <Box
                sx={{
                  height: 8,
                  backgroundColor: "#eee",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                {/* Filled bar */}
                <Box
                  sx={{
                    width: `${item.value}%`,
                    backgroundColor: item.color,
                    height: "100%",
                    transition: "width 0.5s ease",
                  }}
                />
              </Box>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default PriorityBar;
