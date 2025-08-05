import React from 'react';
import { Card, Typography } from '@mui/material';

export default function ShortLinkCard({ link, expiry }) {
  return (
    <Card sx={{ p:2, mt:2 }}>
      <Typography>Shortlink: <a href={link}>{link}</a></Typography>
      <Typography>Expiry: {expiry}</Typography>
    </Card>
  );
}
