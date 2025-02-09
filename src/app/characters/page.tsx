'use client';
import { useEffect, useState } from "react";
import { CharacterDTO, GetAllCharactersParams, Status, Gender, Species } from "@/services/characters/dto";
import CharacterDisplay from "@/components/CharacterDisplay";
import { getAllCharacters } from "@/services";
import CustomMessage from "@/components/CustomMessage";
import Spinner from "@/components/Spinner";
import Link from "next/link";

interface FilterSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string; }[];
}

const FilterSelect = ({ label, name, value, onChange, options }: FilterSelectProps) => (
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded p-2 bg-black text-white"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

interface FilterInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  min?: number;
  max?: number;
  placeholder?: string;
}

const FilterInput = ({ label, name, value, onChange, type = "text", min, max, placeholder }: FilterInputProps) => (
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      placeholder={placeholder}
      className="border rounded p-2 bg-black text-white"
    />
  </div>
);

const CharactersPage = () => {
  const [params, setParams] = useState<GetAllCharactersParams>({
    gender: Gender.MALE,
    status: Status.ALIVE,
    species: Species.HUMAN,
    orderBy: 'id',
    orderByDirection: 'asc',
    size: 10,
    page: 1,
    query: ''
  });
  const [characters, setCharacters] = useState<CharacterDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{ total: number; pages: number }>({ total: 0, pages: 0 });

  const handleParamChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prev: GetAllCharactersParams) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePageChange = (newPage: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setParams((prev: GetAllCharactersParams) => ({
      ...prev,
      page: newPage
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchCharacters = async () => {
      try {
        const data = await getAllCharacters(params);
        setCharacters(data.items);
        setPagination({ total: data.total, pages: data.pages });
        setIsLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    }

    fetchCharacters();
  }, [params]);

  if (error) {
    return <CustomMessage>Error: {error}</CustomMessage>;
  }

  return (
    <div className="flex flex-col items-start gap-y-4 w-full p-4">
      <h2 className="text-2xl font-bold">Check out the <span className="font-bold text-blue-500">Characters</span></h2>
      <div className="w-full rounded-lg shadow p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FilterSelect
            label="Gender"
            name="gender"
            value={params.gender || ''}
            onChange={handleParamChange}
            options={Object.values(Gender).map(gender => ({ value: gender, label: gender }))}
          />

          <FilterSelect
            label="Status"
            name="status"
            value={params.status || ''}
            onChange={handleParamChange}
            options={Object.values(Status).map(status => ({ value: status, label: status }))}
          />

          <FilterSelect
            label="Species"
            name="species"
            value={params.species || ''}
            onChange={handleParamChange}
            options={Object.values(Species).map(species => ({ value: species, label: species }))}
          />

          <FilterSelect
            label="Order By"
            name="orderBy"
            value={params.orderBy || 'id'}
            onChange={handleParamChange}
            options={[
              { value: 'id', label: 'ID' },
              { value: 'name', label: 'Name' }
            ]}
          />

          <FilterSelect
            label="Order Direction"
            name="orderByDirection"
            value={params.orderByDirection || 'asc'}
            onChange={handleParamChange}
            options={[
              { value: 'asc', label: 'Ascending' },
              { value: 'desc', label: 'Descending' }
            ]}
          />

          <FilterInput
            label="Search"
            name="query"
            value={params.query || ''}
            onChange={handleParamChange}
            placeholder="Search characters..."
          />

          <FilterSelect
            label="Size"
            name="size"
            value={params.size?.toString() || '10'}
            onChange={handleParamChange}
            options={[
              { value: '10', label: '10' },
              { value: '20', label: '20' }, 
              { value: '30', label: '30' },
              { value: '40', label: '40' },
              { value: '50', label: '50' }
            ]}
          />
        </div>
      </div>
      { isLoading ? <div className="flex justify-center items-center w-full"><CustomMessage><Spinner /></CustomMessage></div> : (
        <>
          <CharacterDisplay characters={characters} />
          <div className="w-full flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => handlePageChange(Number(params.page) - 1)}
              disabled={Number(params.page) <= 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
              Previous
            </button>
            <span className="mx-4">
              Page {params.page} of {pagination.pages} ({pagination.total} total items)
            </span>
            <button
              onClick={() => handlePageChange(Number(params.page) + 1)}
              disabled={Number(params.page) >= pagination.pages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </>
      )}
      <Link href="/" className="text-blue-500 hover:text-blue-600">Back to home</Link>
    </div>
  );
};

export default CharactersPage;
