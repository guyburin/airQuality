import { Router } from 'express'
import * as airController from '../controllers/airController'

const router: Router = Router()

router.route('/airLocations').get(airController.getAllAirLocation)
router.route('/airLocations').post(airController.setAirLocation)
router.route('/airLocations/:id').patch(airController.updateAirLocationByID)
router.route('/airLocations/:id').delete(airController.deleteAirLocationByID)

export default router