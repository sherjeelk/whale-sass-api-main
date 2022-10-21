import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Site } from '.'
import bcrypt from 'bcrypt'
import * as dns from 'dns'
import { Resource } from '../resource'
import * as shell from 'shelljs'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Site.create({ ...body, user })
    .then((site) => site.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Site.count(query)
    .then(count => Site.find(query, select, cursor)
      .populate('user')
      .then((sites) => ({
        count,
        rows: sites.map((site) => site.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const getMySites = ({ querymen: { query, select, cursor } }, res, next) => {
  console.log('Site ', query)
  if (query.user) {
    Site.count(query)
      .then(count => Site.find(query, select, cursor)
        .populate('user')
        .then((sites) => ({
          count,
          rows: sites.map((site) => site.view())
        }))
      )
      .then(success(res))
      .catch(next)
  } else {
    return res.status(400).send({ msg: 'User Id is required in query' })
  }
}

export const show = ({ params }, res, next) =>
  Site.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((site) => {
      console.log('Site', site)
      return site || null
    })
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Site.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((site) => site ? Object.assign(site, body).save() : null)
    .then((site) => site ? site.view(true) : null)
    .then(success(res))
    .catch(next)

export const updateOne = async ({ user, body, params }, res, next) => {
  const site = await Site.findById(params.id).populate('user').exec()
  if (site) {
    const keys = Object.keys(body)
    keys.map(x => {
      if (body[x]) { site[x] = body[x] } else {
        console.log('Invalid value', x)
      }
    })
    await site.save()
    return res.send(site)
  }
}

export const checkVerification = async ({
  user,
  bodymen: { body },
  params
}, res, next) => {
  const site = await Site.findById(params.id)
  dns.resolveTxt(site.domain, async (err, addresses) => {
    console.log(err, addresses)
    if (err) {
      return res.status(200).send({
        status: 0,
        verified: false
      })
    }
    let found = false
    for (const add of addresses) {
      if (add.includes(site.verificationCode)) {
        found = true
        break
      }
    }
    if (found) {
      // verified
      site.verified = true
      await site.save()
      return res.status(200).send({
        status: 1,
        verified: true
      })
    } else {
      // not verified
      return res.status(200).send({
        status: 0,
        verified: false
      })
    }
  })
}

export const domainVerification = async ({ user, bodymen: { body }, params }, res, next) => {
  try {
    const domain = body.domain
    const site = await Site.findById(body.site)
    const exists = await Site.findOne({ domain })

    if ((exists && exists.id === site.id) || !exists) {
      site.domain = domain
      site.verified = false
      site.verificationCode = await bcrypt.hash(site.domain, 1)
      site.save()
      return res.status(200).send(site)
    } else {
      return res.status(401).send({ status: -1, msg: 'Domain already registered!' })
    }
  } catch (e) {
    console.log('An error occurred', e)
    return res.status(400).send()
  }
}

export const deploySite = async ({ user, bodymen: { body }, params }, res, next) => {
  try {
    console.log(user)
    const domain = body.domain
    const site = await Site.findOne({ domain })
    if (site.verified) {
      let resource = await Resource.findOne({ site: site._id })
      if (resource) {
        console.log('Resource already exist!', resource)
        shell.exec(`sudo sh /opt/sass-apps/update-deployment.sh -s ${site.domain}`, { async: true })
        return res.status(201).send({ status: 0, msg: 'Site is already deployed, scheduled for update deployment!' })
      } else {
        console.log('Cant find resource!')
        resource = await Resource.findOne({ available: true })
        if (!resource) {
          return res.status(400).send({ status: -1, msg: 'No resource left!' })
        }
        resource.date = new Date()
        resource.available = false
        resource.domain = domain
        resource.site = site._id
        await resource.save()
        console.log('Resource do not exists!')
        shell.exec(`sudo /opt/sass-apps/deploy.sh -s ${site.domain} -p ${resource.port} -d ${site.id}`, { async: true })
        return res.status(200).send({ status: 1, msg: 'Deployment is queued successfully!' })
      }
    } else {
      return res.status(400).send({ status: -1, msg: 'Domain is not verified yet!' })
    }
  } catch (e) {
    console.log('An error occurred', e)
    return res.status(400).send({ status: -1, msg: 'An unknown error occurred!' })
  }
}

export const updateSite = async ({ user, bodymen: { body }, params }, res, next) => {
  try {
    console.log(user)
    const domain = body.domain
    const site = await Site.findOne({ domain })
    if (site.verified) {
      let resource = await Resource.findById(site.id)
      if (resource) {
        return res.status(201).send({ status: 0, msg: 'Site is already deployed!' })
      } else {
        resource = await Resource.findOne({ available: true })
        if (!resource) {
          return res.status(400).send({ status: -1, msg: 'Site is not deployed currently!' })
        } else {
          shell.exec(`sudo /opt/sass-apps/update-deployment.sh -s ${site.domain}`, { async: true })
          return res.status(200).send({ status: 1, msg: 'Deployment is queued successfully!' })
        }
      }
    } else {
      return res.status(400).send({ status: -1, msg: 'Domain is not verified yet!' })
    }
  } catch (e) {
    console.log('An error occurred', e)
    return res.status(400).send({ status: -1, msg: 'An unknown error occurred!' })
  }
}

export const destroy = ({ user, params }, res, next) =>
  Site.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((site) => site ? site.remove() : null)
    .then(success(res, 204))
    .catch(next)
