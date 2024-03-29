import { getManager, getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder("games")
      .where("LOWER(games.title) like LOWER(:title)", { title: `%${param}%` })
      .getMany();
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`
      SELECT COUNT(*) as count FROM games    
    `); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return await getRepository(User)
      .createQueryBuilder("users")
      .innerJoin("users.games", "games")
      .where("games.id = :id", { id })
      .getMany();
    // Complete usando query builder
  }
}
