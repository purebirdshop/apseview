import SingleBarChart from './SingleBarChart';
import SingleHalfPieChart from './SingleHalfPieChart'
import { formatBlockName } from '../utils/helper';

const ChartComponent = ({ data }) => {
  if (!data || !data.records) return <p>No data available.</p>;

  const blocks = Object.entries(data.records); // [ ['adults', {...}], ['kids', {...}], ... ]

  return (
    <div className="charts-container">
      {blocks.map(([blockName, blockData]) => (
        <SingleHalfPieChart
          // key={blockName}
          name={formatBlockName(blockName)}
          categories={blockData.categories || {}}
        />
      ))}
    </div>
  );
};

export default ChartComponent;