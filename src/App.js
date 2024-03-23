import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./components/Modal";
import Pagination from "./components/Pagination";

const COLUMNS = [
  {
    Header: "ID",
    accesor: "id",
    Cell: ({ row }) => <p>{row.original.id}</p>,
  },
  {
    Header: "Name",
    accesor: "name",
    Cell: ({ row }) => <p>{row.original.name}</p>,
  },
  {
    Header: "Year",
    accesor: "year",
    Cell: ({ row }) => <p>{row.original.year}</p>,
  },
];

function App() {
  //fetched data from API
  const [getData, setGetData] = useState([]);
  //products from API
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // data for pagination
  const [page, setPage] = useState(1);
  const per_page = 5;
  // id from search input
  const [id, setId] = useState(1);
  // modal state
  const [modal, setModal] = useState(false);
  const [productModal, setProductModal] = useState(null);

  // fetch data with dynamic pagination and offset
  useEffect(() => {
    fetch(`https://reqres.in/api/products?page=${page}&per_page=${per_page}`)
      .then((res) => {
        if (res.status === 400) {
          toast.error("400 Bad Request");
        } else if (res.status === 404) {
          toast.error("404 Not Found. Check if the URL is correct.");
        } else if (res.status === 500) {
          toast.error("500 Internal Server Error. Please try again.");
        } else if (res.status === 502) {
          toast.error("502 Bad Gateway");
        } else if (res.status === 503) {
          toast.error("503 Service Unavailable. Please try again later.");
        }
        return res.json();
      })
      .then((data) => {
        setGetData(data);
        setProducts(data.data);
        setFilteredData(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // todo: catch 4xx and 5xx errors
  }, [page, per_page]);

  // handle input change
  const handleInputValue = (value) => {
    setId(value);
    filterData(value);
  };

  const filterData = (id) => {
    const filteredData = products.filter(
      (product) => Number(product.id) === Number(id)
    );
    setFilteredData(filteredData);
  };

  // creating table instance
  const data = id ? filteredData : products;
  const columns = useMemo(() => COLUMNS, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ data, columns });

  //modal function
  const showModal = (e) => {
    setModal(true);
    setProductModal(e);
  };

  return (
    <div className="w-screen h-screen flex flex-col relative">
      <Toaster
        position="top-right"
        toastOptions={{ style: { border: "1px solid red" } }}
      />
      <div className="mx-auto pt-8 flex space-x-2">
        <label htmlFor="id" className="self-end">
          Search by ID:
        </label>
        <input
          id="id"
          name="id"
          className=" px-2 py-1 rounded-xl border border-black"
          type="number"
          placeholder="Search"
          onChange={(e) => handleInputValue(e.target.value)}
        />
      </div>
      {/* filter by id - numbers only */}
      {/* paginated table of products*/}
      <table
        className="mx-auto my-4 w-1/2 max-w-lg shadow-md"
        {...getTableProps()}>
        <thead className="bg-slate-300">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="p-4" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      onClick={() => showModal(cell.row.original)}
                      style={{
                        backgroundColor: cell.row.original.color,
                        padding: "20px 10px",
                        textAlign: "center",
                      }}
                      className="cursor-pointer"
                      {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* pagination buttons */}
      <Pagination getData={getData} page={page} setPage={setPage} />
      {/* modal with all item data -> onClick */}
      {modal && (
        <div className="absolute inset-0 w-full h-full bg-slate-200/25 flex items-center">
          <Modal product={productModal} change={setModal} />
        </div>
      )}
    </div>
  );
}

export default App;
