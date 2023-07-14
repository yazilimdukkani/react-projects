
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

// Example items, to simulate fetching from another resources.


function Paginated({ currentItems }) {
    
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    return ( <div>
        {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item.name}</h3>
          </div>
        ))}
    </div>  );
}

export default Paginated;