export interface MonsterTypeI{
    name: string
    strongAgainst: Array<MonsterTypeI>  |   Array<String>
    weakAgainst: Array<MonsterTypeI>    |   Array<String>
}
