import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { getStats } from "../api/urlApi";
import { log } from "../api/logApi";

export default function StatsPage() {
  const [shortcode, setShortcode] = useState("");
  const [result, setResult] = useState(null);

  const onFetch = async () => {
    const stats = await getStats(shortcode);
    if(stats.error) await log("frontend", "error", "page", stats.error);
    else await log("frontend", "info", "page", `Stats fetched for ${shortcode}`);
    setResult(stats);
  };

  return (
    <Paper sx={{ p:3, mt:2 }}>
      <Typography variant="h6">Short URL Statistics</Typography>
      <Box sx={{ display:"flex", gap:2, mt:2 }}>
        <TextField label="Shortcode" value={shortcode} onChange={e=>setShortcode(e.target.value)}/>
        <Button variant="contained" onClick={onFetch}>Get Stats</Button>
      </Box>
      {result && (
        <Box sx={{ mt:2 }}>
          {result.error
            ? <Typography color="error">{result.error}</Typography>
            : <>
                <Typography>Short Link: {result.shortLink}</Typography>
                <Typography>Original: {result.original}</Typography>
                <Typography>Created: {result.created}</Typography>
                <Typography>Expires: {result.expiry}</Typography>
                <Typography>Total Clicks: {result.clicks}</Typography>
                <Typography variant="subtitle2">Click Details:</Typography>
                {result.clickDetails.map((c,i) =>
                  <div key={i}>At: {c.at}, Referrer: {c.referer||"N/A"}, Geo: {c.geo||"N/A"}</div>
                )}
              </>
          }
        </Box>
      )}
    </Paper>
  );
}
