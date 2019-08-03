import itemModel from '../models/itemModel';

const {
  create, getItemsByBucketId, selectOneitem, updateItem, deleteOneItem
} = itemModel;


/**
 *
 *
 * @export
 * @class ItemController
 */
export default class ItemController {
  /**
     * 
     *
     * @static
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @returns {object} Item Details
     * @memberof ItemController
     */
  static async createItem(req, res) {
    try {
      const data = {...req.body, bucketList_id: req.params.id};
      const newItem = await create(data);
      return res.status(201).json({
        status: 'success',
        data: newItem,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }

   /**
   * @description Get all item
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} itemDetails
   * @memberof ItemController
   */
  static async getAllItem(req, res, next) {
    try {
        const data = req.params.id;
      const allItem = await getItemsByBucketId(data);
      if (allItem.length > 0) {
        return res.status(200).json({
            status: 'success',
            data: allItem,
          });
      }
      return res.status(404).json({
        status: 'error',
        error: 'There are no item in this database',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }

  /**
   * @description Get specific item
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} itemsDetails
   * @memberof ItemController
   */
  static async getSpecificItem(req, res, next) {
    try {
      const { id } = req.params;
      const itemDetails = await selectOneitem(parseInt(id, 10));
      if (itemDetails) {
        return  res.status(200).json({
            status: 'success',
            data: itemDetails ,
          });
      }
        return  res.status(404).json({
            status: 'error',
            error: 'item not found',
          });
    }catch (err) {
    return res.status(500).json({
      status: 'error',
      error: 'Internal server error',
    });
    }
  }

  
  /**
   * @description update specific item
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} itemsDetails
   * @memberof ItemController
   */
  static async updateItemData(req, res, next) {
    try {
      const { id } = req.params;
      const dataFetch = { ...req.body };
      const itemToBeUpdated = await selectOneitem(parseInt(id, 10));
      if (!itemToBeUpdated) {
        return res.status(400).json({
         status: 'error',
         error: 'item does not exist',
       });
     }       
      const newData = Object.assign(itemToBeUpdated, dataFetch);
      const updatedItemDetail = await updateItem(newData, id);   
      return res.status(201).json({
        status: 'success',
        data: updatedItemDetail
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error'
      });
  }  
 }

 /**
   * @description Delete specific item
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} itemsDetails
   * @memberof ItemController
   */
  static async deleteItem(req, res) {
    const { id } = req.params;
    const itemId = await selectOneitem(id);
    if (!itemId) {
      return res.status(400).json({
       status: 'error',
       error: 'Item does not exist',
     });
   }   
    const deletedItem = await deleteOneItem(id);
    if (deletedItem ) {
      return res.status(200).json({
        status: 'success',
        data: {message:'Item succesfully deleted'}
      });
    }
    return res.status(400).json({
      status: 'error',
      error: 'Internal server error'
    });
  }
}