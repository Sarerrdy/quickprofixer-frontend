import React from "react";
import { Box, Typography, Card, CardContent, Chip, Button, Grid } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { sample } from "../../../samp/sample";

interface SubmittedQuotesProps {
  fixRequestId: number;
}

const getFixerName = (fixerId: string) => {
  const fixer = sample.fixers.find(f => f.id === fixerId);
  if (!fixer) return fixerId;
  return `${fixer.firstName} ${fixer.lastName}`;
};

const SubmittedQuotes: React.FC<SubmittedQuotesProps> = ({ fixRequestId }) => {
  // Use quotes from the sample aggregator
  const quotes = sample.quotes.filter(q => q.fixRequestId === fixRequestId);

  if (quotes.length === 0) {
    return (
      <Box sx={{ my: 2 }}>
        <Typography color="text.secondary">No quotes submitted for this request.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#6366f1" }}>
        Submitted Quotes
      </Typography>
      <Grid container spacing={2}>
        {quotes.map((quote, idx) => (
          <Grid item xs={12} key={quote.id || idx}>
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Chip
                    label={getFixerName(quote.fixerId)}
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {quote.createdAt ? new Date(quote.createdAt).toLocaleDateString() : ""}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                  Quote
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {quote.description}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Amount:</strong> ₦{quote.amount?.toLocaleString() || "N/A"}
                </Typography>
                {Array.isArray(quote.items) && quote.items.length > 0 && (
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight={600}>Items:</Typography>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {quote.items.map((item: any, i: number) => (
                        <li key={i}>
                          <Typography variant="body2">
                            {item.name} - ₦{item.price?.toLocaleString() || "N/A"}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>
                )}
                {quote.supportingFiles && quote.supportingFiles.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" fontWeight={600}>Supporting Files:</Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5 }}>
                      {quote.supportingFiles.map((file: any, i: number) => (
                        <Button
                          key={i}
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener"
                          startIcon={<InsertDriveFileIcon />}
                          size="small"
                          sx={{ textTransform: "none" }}
                        >
                          {file.fileName}
                        </Button>
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SubmittedQuotes;