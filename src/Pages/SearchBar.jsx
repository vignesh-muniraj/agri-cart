// import * as React from "react";
// import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
// import { API } from "./Global"; // ✅ your API base URL

// function SearchBar({ onResults }) {
//   const [query, setQuery] = React.useState("");

//   // Function to perform search
//   const handleSearch = async () => {
//     if (!query.trim()) return;

//     try {
//       const res = await fetch(`${API}/products/search?q=${query}`);
//       const data = await res.json();
//       console.log("Search results:", data);

//       if (onResults) {
//         onResults(data);
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//     }
//   };

//   // Press Enter to trigger search
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   return (
//     <TextField
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//       onKeyPress={handleKeyPress}
//       variant="outlined"
//       placeholder="Search products…"
//       size="small"
//       sx={{
//         width: 350,
//         borderRadius: 4,
//         marginRight:10,
//         "& .MuiOutlinedInput-root": {
//           "& fieldset": {
//             borderColor: "green", // ✅ outline color
//           },
//           "&:hover fieldset": {
//             borderColor: "darkgreen", // ✅ hover outline
//           },
//           "&.Mui-focused fieldset": {
//             borderColor: "green", // ✅ focused outline
//           },
//         },
//       }}
//       InputProps={{
//         startAdornment: (
//           <InputAdornment position="start">
//             <IconButton onClick={handleSearch}>
//               <SearchIcon style={{ color: "green" }} />
//             </IconButton>
//           </InputAdornment>
//         ),
//       }}
//     />
//   );
// }

// export { SearchBar };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/ProductList?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-container">
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="outlined"
        placeholder="Search products…"
        size="small"
        sx={{
          width: 350,
          borderRadius: 0,
          marginRight: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "darkgreen",
              borderRadius: 10,
              boxShadow: "0 1px 4px rgba(27, 73, 9, 0.28)",
            },
            "&:hover fieldset": {
              borderColor: "darkgreen",
            },
            "&.Mui-focused fieldset": {
              borderColor: "darkgreen",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export { SearchBar };
