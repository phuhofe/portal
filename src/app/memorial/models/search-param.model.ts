export interface SearchParam {
  firstname: string;
  lastname: string;
  regionId: string;
  cityId: string;
  'birthDate.dateFrom': Date;
  'birthDate.dateTo': Date;
  'deathDate.dateFrom': Date;
  'deathDate.dateTo': Date;
}
