import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { createShortUrl } from "../api/urlApi";
import { log } from "../api/logApi";

export default function ShortenerPage() {
  const [urls, setUrls] = useState([{ url:"", validity:"", shortcode:"" }]);
  const [results, setResults] = useState([]);

  const handleChange = (i, fld, v) => {
    setUrls(old => [...old.slice(0,i), { ...old[i], [fld]: v }, ...old.slice(i+1)]);
  };

  const addRow = () => {
    setUrls(old => old.length < 5 ? [...old, { url:"", validity:"", shortcode:""}] : old);
  };

  const handleSubmit = async () => {
    let allResults = [];
    for(let i=0; i<urls.length; ++i) {
      let { url, validity, shortcode } = urls[i];
      if (!/^https?:\/\/.+/.test(url)) {
        allResults[i] = {error: "Invalid URL"};
        await log("frontend", "error", "page", "Invalid URL entered");
        continue;
      }
      const res = await createShortUrl(url, validity, shortcode);
      if (res.shortLink) {
        allResults[i] = res;
        await log("frontend", "info", "page", "Shortened URL created");
      } else {
        allResults[i] = { error: res.error };
        await log("frontend", "error", "page", res.error);
      }
    }
    setResults(allResults);
  };

  return (
    <Paper sx={{ p:3, mt:2 }}>
      <Typography variant="h6">Shorten up to 5 URLs</Typography>
      {urls.map((item, i) => (
        <Box sx={{ display:"flex", gap:1, mb:1 }} key={i}>
          <TextField label="URL" value={item.url} onChange={e=>handleChange(i, "url", e.target.value)} sx={{ flex:2 }}/>
          <TextField label="Validity (min)" value={item.validity} onChange={e=>handleChange(i, "validity", e.target.value)} sx={{ flex:1 }}/>
          <TextField label="Shortcode (opt)" value={item.shortcode} onChange={e=>handleChange(i,"shortcode",e.target.value)} sx={{ flex:1 }}/>
        </Box>
      ))}
      <Box sx={{ mt:2 }}>
        <Button variant="contained" onClick={handleSubmit}>Shorten</Button>
        <Button sx={{ ml:2 }} disabled={urls.length>=5} onClick={addRow}>Add Row</Button>
      </Box>
      <Box sx={{ mt:2 }}>
        {results.map((res, i) => (
          <Typography color={res.error?"error":"primary"} key={i}>
            {res.shortLink ? `Short Link: ${res.shortLink} (Expiry: ${res.expiry})` : res.error}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
}
