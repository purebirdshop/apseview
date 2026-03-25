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

export const CHART_COLORS = {

  "auditorium": "#FFC107",
  "302229": "#FFC107",
  "kidz": "#2ECC71",
  "302227": "#2ECC71",
  "306757": "#2ECC71",
  "302225": "#2ECC71",
  "jrHighAwakenYouth": "#E91E63",
  "304721": "#E91E63",
  "304720": "#E91E63",
  "highSchoolTeenagers": "#5B5BFF",
  "652218": "#5B5BFF",
  "648461": "#5B5BFF",
  "highCards": "#FF8A1F",
  "391753": "#FF8A1F",
  "644934": "#FF8A1F",
  "dNAAttendees": "#C13CFF",
  "633276": "#C13CFF",
  "302233": "#C13CFF",
  "assignedVolunteers": "#B8860B",
  "679252": "#B8860B",
  "others":[
    "#5FAE1B",
    "#FF3B30",
    "#0B63C7",
    "#FF5A5F",
    "#5A189A"
  ]
}

export const COLORS = [
  "#FFC107",
  "#2ECC71",
  "#E91E63",
  "#5B5BFF",
  "#FF8A1F",
  "#C13CFF",
  "#B8860B",
  "#5FAE1B",
  "#FF3B30",
  "#0B63C7",
  "#FF5A5F",
  "#5A189A"
  // "#0088FE",
  // "#00C49F",
  // "#FFBB28",
  // "#FF8042",
  // "#AA336A",
  // "#9933FF",
  // "#eea941",
  // "#b11810",
  // "#fa431b",
  // "#e0ee7d",
  // "#31eae5",
  // "#fcd764",
  // "#10686a",
]

export const formatDate = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const friendlyDate = (uglyDate) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(uglyDate);
}

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
  CHART_COLORS,
  COLORS,
  capsFirstLetter, 
  formatDate, 
  friendlyDate,
  formatBlockName, 
  getCurrentMonthYear, 
  buildDateString,
  sumTotals
};