/**
 * Adiciona o ID ao usuário e remove o campo _id.
 * @param {Object} user - O usuário ao qual o ID será adicionado.
 * @return {Object} - O usuário com o campo id no lugar de _id.
 */
function addIdToUser(user) {
  user.id = user._id;
  delete user._id;
  return user;
}

/**
 * Repositório de usuários para operações em banco de dados.
 * @class
 */
class UserRepository {
  /**
   * Cria uma instância do repositório de usuários.
   * @param {Object} collection - coleção do MongoDB onde os dados dos usuários estão.
   */
  constructor(collection) {
    this.collection = collection;
  }

  /**
   * Encontra um usuário pelo e-mail.
   * @param {string} email - O e-mail do usuário a ser encontrado.
   * @return {Object} - O usuário encontrado.
   * @throws {Error} - Se o usuário não for encontrado.
   */
  async findOneByEmail(email) {
    const user = await this.collection.findOne({ email });

    if (user === null) {
      throw new Error(`User with email ${email} does not exist`);
    }

    return addIdToUser(user);
  }

  /**
   * Encontra um usuário pelo ID.
   * @param {string} id - O ID do usuário a ser encontrado.
   * @return {Object} - O usuário encontrado.
   * @throws {Error} - Se o usuário não for encontrado.
   */
  async findOneById(id) {
    const user = await this.collection.findOne({ _id: id });

    if (user === null) {
      throw new Error(`User with id ${id} does not exist`);
    }

    return addIdToUser(user);
  }

  /**
   * Insere um novo usuário na coleção.
   * @param {Object} user - O usuário a ser inserido.
   * @return {Object} - O usuário inserido com o campo id.
   */
  async insert(user) {
    const result = await this.collection.insertOne(user);
    return addIdToUser({ ...user, _id: result.insertedId });
  }


  /**
   * Atualiza os dados de um usuário existente.
   * @param {string} id - O ID do usuário a ser atualizado.
   * @param {Object} data - Os dados a serem atualizados no usuário.
   * @return {Object} - O usuário atualizado.
   * @throws {Error} - Se o usuário não for encontrado.
   */
  async update(id, data) {
    const result = await this.collection.findOneAndUpdate({ _id: id }, {
      $set: data,
    }, {
      returnNewDocument: true,
    });

    if (result.value === null) {
      throw Error(`User with id ${id} was not found`);
    }

    return await this.findOneById(id);
  }

  /**
   * Deleta um usuário da coleção.
   * @param {string} id - O ID do usuário a ser deletado.
   * @throws {Error} - Se o usuário não for encontrado.
   */
  async delete(id) {
    const result = await this.collection.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new Error(`User with id ${id} does not exist`);
    }
  }

  /**
   * Encontra todos os usuários na coleção.
   * @return {Object[]} - A lista de todos os usuários.
   */
  async findAll() {
    const users = await this.collection.find().toArray();
    return users.map(addIdToUser);
  }

  /**
   * Deleta todos os usuários da coleção.
   */
  async deleteAll() {
    await this.collection.deleteMany({});
  }
}

module.exports = UserRepository;
