import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getALlOrdersOfShop } from '../../redux/actions/orderActions';

const AllOrders = () => {
  const {orders} = useSelector((state) => state.order)
  const {seller} = useSelector((state) => state.seller)

  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(getALlOrdersOfShop(seller && seller._id))
  }, [dispatch])
    const columns = [
        {
          field: "id",
          headerName: "Order Id",
          minWidth: 150,
          flex: 0.7,
        },
        {
          field: "status",
          headerName: "Status",
          minWidth: 130,
          flex: 0.7,
          cellClassName: (params) => {
            return params.row.status === "Delivered" ? "text-[green]" : "text-[red]"
          }
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          minWidth: 130,
          flex: 0.7,
          type: "number"
        },
        {
          field: "total",
          headerName: "Total",
          minWidth: 130,
          flex: 0.8,
          type: "number",
        },
        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/order/${params.row.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20}/>
                            </Button>
                        </Link>
                    </>
                )
            }
        }
      ];
      const rows = [];
      orders && orders.forEach((item) => {
        rows.push({
          id: item._id,
          itemsQty: item.cart.length,
          total: "$" + item.totalPrice,
          status: item.status
        })
      })
  return (
    <div className='w-full mx-8 mt-10 bg-white'>
        <DataGrid columns={columns} rows={rows} pageSizeOptions={10} disableRowSelectionOnClick autoHeight/>
    </div>
  )
}

export default AllOrders