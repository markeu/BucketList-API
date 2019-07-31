import itemModel from '../models/itemModel';

const {
  create, getItemQuery,
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
   * @description Get all bucketlists
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} bucketListsDetails
   * @memberof BucketListController
   */
  static async getAllItem(req, res, next) {
    try {
      const allItem = await getItemQuery();
      if (allItem.length > 0) {
        return res.status(200).json({
            status: 'success',
            data: allItem,
          });
      }
      return res.status(400).json({
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
}