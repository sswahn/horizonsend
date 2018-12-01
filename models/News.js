/**
 * News Model
 * 
 */

class News {
  get(request) {
    return request.database.collection('news')
      .find()
      .limit(6)
      .sort({ created_at: -1 })
      .toArray()
  }

  getOne(request) {
    return request.database.collection('news')
      .find({ _id: request.ObjectId(request.params.id) })
      .toArray()
  }

  post(request, user) {
    if (request.body.image_src === undefined) {
      throw new Error('An image source address is required.')
    }
    if (request.body.image_alt === undefined) {
      throw new Error('An image description is required.')
    }
    if (request.body.caption === undefined) {
      throw new Error('An image caption is required.')
    }
    if (request.body.title === undefined) {
      throw new Error('A title is required.')
    }
    if (request.body.message === undefined) {
      throw new Error('A message body is required.')
    }
    const values = {
      image_src: request.body.image_src,
      image_alt: request.body.image_alt,
      caption: request.body.caption,
      title: request.body.title,
      message: request.body.message,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: user[0].username,
      updated_by: user[0].username
    }
    return request.database.collection('news').insertOne(values)
  }

  put(request, user) {
    if (request.body.image_src === undefined) {
      throw new Error('An image source address is required.')
    }
    if (request.body.image_alt === undefined) {
      throw new Error('An image description is required.')
    }
    if (request.body.caption === undefined) {
      throw new Error('An image caption is required.')
    }
    if (request.body.title === undefined) {
      throw new Error('A title is required.')
    }
    if (request.body.message === undefined) {
      throw new Error('A message body is required.')
    }
    const values = {
      image_src: request.body.image_src,
      image_alt: request.body.image_alt,
      caption: request.body.caption,
      title: request.body.title,
      message: request.body.message,
      updated_at: Date.now(),
      updated_by: user
    }
    return request.database.collection('news').updateOne(
      { '_id': request.ObjectId(request.params.id) },
      { $set: values }
    )
  }

  delete(request, user) {
    return request.database.collection('news').deleteOne(
      { '_id': request.ObjectId(request.params.id) }
    )
  }
}

module.exports = News