const express = require('express')
const PolicyService = require('../services/policyholder');
const PolicyRepository = require('../repositories/policyholder');

const router = express.Router();

router.all('*',async(req,res,next)=> {
    const dbPool = require('../server').db
    req.services = {
        policyService: new PolicyService(new PolicyRepository(dbPool))
    }
    next();
});

router.get('/',async(req,res,next)=> {
    res.render('policyholders', {title: '1234'})
});

router.get('/:code',async(req,res,next)=> {
    const id = +req.params.code;
    if (req.params.code === null || req.params.code === undefined) {
        return res.status(400).json('code cannot be null or empty')
    } else if (isNaN(id) || id === 0) {
        return res.status(400).json('code should be a number and greater than 0')
    }

    const result = await req.services.policyService.getPolicyholderIncludeSubtree(id);

    return res.status(200).json(result)
})

router.get(`/:code/top`,async(req,res,next)=> {
    const id = +req.params.code;
    if (req.params.code === null || req.params.code === undefined) {
        return res.status(400).json('code cannot be null or empty')
    } else if (isNaN(id) || id === 0) {
        return res.status(400).json('code should be a number and greater than 0')
    }
    const result = await req.services.policyService.getIntroducerIncludeSubtree(id);
    return res.status(200).json(result)
})

module.exports = router;