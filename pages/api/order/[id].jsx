import connectDB from '../../../utils/connectDB'
import Orders from '../../../models/orderModel'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getOrder(req, res)
            break;
    }
}

const getOrder = async (req, res) => {
    try {
        const { id } = req.query;
        const order = await Orders.findById(id)
        if(!order) return res.status(400).json({err: 'This order does not exist.'})
        
        res.json({ order })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}
