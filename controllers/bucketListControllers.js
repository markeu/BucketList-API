import bucketListModel from '../models/bucketListModel';

const {
  create, getbucketListQuery, selectOneBucketList, updateBucketList, deleteOneBucketList
} = bucketListModel;


/**
 *
 *
 * @export
 * @class BucketListController
 */
export default class BucketListController {
  /**
     * 
     *
     * @static
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @returns {object} bucketListsDetails
     * @memberof BucketListController
     */
  static async createBucketList(req, res) {
    try {
      const data = {...req.body, created_by: req.user.id};
      const newBucketList = await create(data);
      return res.status(201).json({
        status: 'success',
        data: newBucketList,
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
  static async getAllbucketLists(req, res, next) {
    try {
      const allBucketLists = await getbucketListQuery();
      if (allBucketLists.length > 0) {
        return res.status(200).json({
            status: 'success',
            data: allBucketLists,
          });
      }
      return res.status(400).json({
        status: 'error',
        error: 'There are no bucketlist in this database',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }

/**
   * @description Get specific bucketlist
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} bucketListsDetails
   * @memberof BucketListController
   */
  static async getSpecificBucketList(req, res, next) {
    try {
      const { id } = req.params;
      const bucketListDetails = await selectOneBucketList(parseInt(id, 10));
      if (bucketListDetails) {
        return  res.status(200).json({
            status: 'success',
            data: bucketListDetails ,
          });
      }
        return  res.status(400).json({
            status: 'error',
            error: 'Bucketlist not found',
          });
    }catch (err) {
    return res.status(500).json({
      status: 'error',
      error: 'Internal server error',
    });
    }
  }

  /**
   * @description update bucketlists
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} bucketListsDetails
   * @memberof BucketListController
   */
  static async updateBucketList(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const bucketListToBeUpdated = await selectOneBucketList(parseInt(id, 10));

      if (!bucketListToBeUpdated) {
        return res.status(400).json({
         status: 'error',
         error: 'BucketList does not exist',
       });
     }
      if(req.user.id != bucketListToBeUpdated.created_by) {
        return res.status(401).json({
          status: 'error',
          error: 'unauthorized to perform action',
        });
     }
      if (bucketListToBeUpdated.name === name ) {
        return res.status(400).json({
          status: 'error',
          error: `bucketList is already set to ${name}`,
        });
      }
      if (Object.keys(bucketListToBeUpdated.name).length === 0) {
        return res.status(400).json({
          status: 'error',
          error: 'Name key must be defined',
        });
      }
      const data = {id, name};
      const updatedbucketListDetails = await updateBucketList(data);
      return res.status(201).json({
        status: 'success',
        data: updatedbucketListDetails
      });
    } catch (err) {
  		return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }

   /**
   *
   * Method to delete buckelist
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} containing response to the user
   * @memberof BucketList Controller
   */
  static async deleteBucketlist(req, res) {
    const { id } = req.params;
    const bucketListId = await selectOneBucketList(id);
    if (!bucketListId) {
      return res.status(400).json({
       status: 'error',
       error: 'bucketList does not exist',
     });
   }   
   if ( req.user.id != bucketListId.created_by)
   return res.status(401).json({
     status: 'error',
     error: 'unauthorized',
   });

    const deletedBucketList = await deleteOneBucketList(id);
    if (deletedBucketList ) {
      return res.status(200).json({
        status: 'success',
        data: {message:'BucketList succesfully deleted'}
      });
    }
    return res.status(400).json({
      status: 'error',
      error: 'Internal server error'
    });
  }
}