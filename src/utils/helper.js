export const months = [
  'January',    //  0
  'February',   //  1
  'March',      //  2
  'April',      //  3
  'May',        //  4
  'June',       //  5
  'July',       //  6
  'August',     //  7
  'September',  //  8
  'October',    //  9
  'November',   // 10
  'December'    // 11
];

// export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#9933FF"];

export const COLORS = [
  "#0088FE",
  "#00C49F",
  // "#FFBB28",
  // "#FF8042",
  // "#AA336A",
  "#9933FF",
  
  "#eea941",
  "#b11810",
  "#fa431b",
  "#e0ee7d",
  "#31eae5",
  "#fcd764",
  "#10686a",
]

export const formatDate = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const formatBlockName = (name) => {
  // Replace dashes with spaces and capitalize each word
  return name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getCurrentMonthYear = () => {
  const today = new Date();
  return { month: today.getMonth(), year: today.getFullYear() }; // month: 0-11
};

export const buildDateString = (year, month, day) => {
  const mm = String(month + 1).padStart(2, '0'); // months are 0-based
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
};

export const capsFirstLetter = (string) => {
  if (typeof string !== 'string' || string.length === 0) {
    return string; // Return original string for non-string or empty inputs
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const sumTotals = (data) => {
  let sum = 0;

  // Helper function to recursively walk through object/array
  function traverse(node) {
    if (Array.isArray(node)) {
      node.forEach(traverse);
    } else if (node && typeof node === "object") {
      // Add the total if it exists
      if (typeof node.total === "number") {
        sum += node.total;
      }
      // Recurse into nested keys
      Object.values(node).forEach(traverse);
    }
  }

  traverse(data);
  return sum;
}

export default {
  COLORS,
  capsFirstLetter, 
  formatDate, 
  formatBlockName, 
  getCurrentMonthYear, 
  buildDateString,
  sumTotals
};