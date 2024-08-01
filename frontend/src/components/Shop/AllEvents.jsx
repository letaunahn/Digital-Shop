import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteEvent, getAllEventsShop } from '../../redux/actions/eventActions';

const AllEvents = () => {
  const {events, isLoading} = useSelector((state) => state.events)
  const {seller} = useSelector((state) => state.seller)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllEventsShop(seller && seller._id))
  }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteEvent(id))
        window.location.reload()
      };
      const columns = [
        {
          field: "id",
          headerName: "Product Id",
          minWidth: 150,
          flex: 0.7,
        },
        {
          field: "name",
          headerName: "Name",
          minWidth: 180,
          flex: 1.4,
        },
        {
          field: "price",
          headerName: "Price",
          minWidth: 100,
          flex: 0.6,
        },
        {
          field: "Stock",
          headerName: "Stock",
          minWidth: 80,
          flex: 0.5,
          type: "number",
        },
        {
            field: "sold",
            headerName: "Sold out",
            type: "number",
            minWidth: 130,
            flex: 0.6
        },
        {
            field: "Preview",
            flex: 0.8,
            minWidth: 100,
            headerName: "Preview",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const d = params.row.name;
                const product_name = d.replace(/\s+/g, "-")
                return (
                    <>
                        <Link to={`/product/${product_name}`}><Button><AiOutlineEye size={20}/></Button></Link>
                    </>
                )
            }
        },
        {
            field: "Delete",
            flex: 0.8,
            minWidth: 120,
            headerName: "Delete",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return(
                    <>
                        <Button onClick={() => handleDelete(params.id)}>
                            <AiOutlineDelete size={20}/>
                        </Button>
                    </>
                )
            }
        }
      ];
      const rows = [];
      events && events.forEach((item) => {
        rows.push({
          id: item._id,
          name: item.name,
          price: "$" + item.discountPrice,
          Stock: item.stock,
          sold: item.sold_out
        })
      })
  return (
    <div className='w-full mx-8 mt-10 bg-white'>
        <DataGrid className='overflow-x-scroll' columns={columns} rows={rows} pageSizeOptions={10} disableRowSelectionOnClick autoHeight/>
    </div>
  )
}

export default AllEvents
