import express, {Request,Response} from 'express'
const router = express.Router();
const port =process.env.port

router.get('/healthcheck', (req: Request, res: Response) => {
    res.status(200).send('Im healthy :)');
  });

  
  export default router;