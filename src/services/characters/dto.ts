enum Gender {
    MALE = 'male',
    NOT_MALE = '!male',
    FEMALE = 'female',
    NOT_FEMALE = '!female',
    UNKNOWN = 'unknown',
    NOT_UNKNOWN = '!unknown',
    NULL = ''
}

enum Status {
    ALIVE = 'alive',
    NOT_ALIVE = '!alive',
    DEAD = 'dead',
    NOT_DEAD = '!dead',
    UNKNOWN = 'unknown',
    NOT_UNKNOWN = '!unknown'
}

enum Species {
    HUMAN = 'human',
    NOT_HUMAN = '!human',
    ROBOT = 'robot',
    NOT_ROBOT = '!robot',
    HEAD = 'head',
    NOT_HEAD = '!head',
    ALIEN = 'alien',
    NOT_ALIEN = '!alien',
    MUTANT = 'mutant',
    NOT_MUTANT = '!mutant',
    MONSTER = 'monster',
    NOT_MONSTER = '!monster',
    UNKNOWN = 'unknown',
    NOT_UNKNOWN = '!unknown'
}

interface CharacterDTO {
    id: number;
    name: string;
    gender: Gender;
    status: Status;
    species: Species;
    createdAt: string;
    image: string;
}

interface CharacterResponseDTO {
    items: CharacterDTO[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

interface GetAllCharactersParams {
    gender?: Gender | null;
    status?: Status | null;
    species?: Species | null;
    orderBy?: 'id' | 'name';
    orderByDirection?: 'asc' | 'desc';
    query?: string;
    page?: number;
    size?: number;
}

export type { CharacterDTO, CharacterResponseDTO, GetAllCharactersParams };
export { Gender, Status, Species };