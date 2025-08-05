import React, { useState } from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
import ShortenerPage from "./page/ShortenerPage";
import StatsPage from "./page/statsPage";

function App() {
  const [tab, setTab] = useState(0);

  return (
    <Container>
      <Box mt={4}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Shorten URL"/>
          <Tab label="Stats"/>
        </Tabs>
        {tab === 0 && <ShortenerPage/>}
        {tab === 1 && <StatsPage/>}
      </Box>
    </Container>
  );
}
export default App;
