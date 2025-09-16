import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { API } from "./Global"; // ✅ your API base URL

function SearchBar({ onResults }) {
  const [query, setQuery] = React.useState("");

  // Function to perform search
  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await fetch(`${API}/products/search?q=${query}`);
      const data = await res.json();
      console.log("Search results:", data);

      if (onResults) {
        onResults(data);
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // Press Enter to trigger search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <TextField
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyPress={handleKeyPress}
      variant="outlined"
      placeholder="Search products…"
      size="small"
      sx={{
        width: 350,
        borderRadius: 4,
        marginRight:10,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "green", // ✅ outline color
          },
          "&:hover fieldset": {
            borderColor: "darkgreen", // ✅ hover outline
          },
          "&.Mui-focused fieldset": {
            borderColor: "green", // ✅ focused outline
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={handleSearch}>
              <SearchIcon style={{ color: "green" }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export { SearchBar };
