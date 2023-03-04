import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select,
  Container,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Project, ProjectsResponse } from '../types';
import { BiSort } from 'react-icons/bi';

const projectsTemplate: Project[] = [
  {
    id: '1',
    admin: 'John Doe',
    title: 'Project A',
    requirements: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    feedback: [
      {
        score: 9,
        comment: 'Great project, really enjoyed working on it!',
      },
      {
        score: 8,
        comment:
          'Some areas for improvement, but overall a positive experience.',
      },
    ],
    status: 'Active',
    members: [
      {
        first_name: 'Alice',
        position: 'Frontend Developer',
      },
      {
        first_name: 'Bob',
        position: 'Backend Developer',
      },
    ],
    rating: 4.5,
    description: 'This is the first project',
    how_to_apply: 'Send your CV and portfolio to john@doe.com',
  },
  {
    id: '2',
    admin: 'Jane Smith',
    title: 'Project B',
    requirements: ['Python', 'Django', 'PostgreSQL'],
    feedback: [
      {
        score: 7,
        comment: 'Good project, but some communication issues with the admin.',
      },
      {
        score: 6,
        comment:
          'Had some technical difficulties, but managed to overcome them.',
      },
    ],
    status: 'Inactive',
    members: [
      {
        first_name: 'Charlie',
        position: 'Full-stack Developer',
      },
      {
        first_name: 'David',
        position: 'Data Analyst',
      },
    ],
    rating: 3.5,
    description: 'This is the second project',
    how_to_apply: 'Send your CV and cover letter to jane@smith.com',
  },
  {
    id: '3',
    admin: 'Mark Johnson',
    title: 'Project C',
    requirements: ['Java', 'Spring Boot', 'MySQL'],
    feedback: [
      {
        score: 10,
        comment:
          'Absolutely loved this project, would work on it again anytime!',
      },
      {
        score: 9,
        comment: 'Great team and admin, highly recommended.',
      },
    ],
    status: 'Active',
    members: [
      {
        first_name: 'Emily',
        position: 'Backend Developer',
      },
      {
        first_name: 'Frank',
        position: 'QA Engineer',
      },
    ],
    rating: 5,
    description: 'This is the third project',
    how_to_apply: 'Apply on our website at www.example.com',
  },
];

type Props = {
  projects: ProjectsResponse;
  page: number;
  perPage: number;
  setPerPage: any;
  setPage: any;
  setFilter: any;
};

export const ProjectsTableComponent = ({
  projects,
  page,
  perPage,
  setPage,
  setPerPage,
  setFilter,
}: Props) => {
  return (
    <Container maxWidth={'none'} m={0} p={0} px={20} mt={8}>
      <Table>
        <Thead>
          <Tr>
            <Th
              onClick={() => setFilter('title')}
              cursor='pointer'
              display={'flex'}
              alignItems={'center'}
            >
              <Text>Title</Text>
              <BiSort size={'18'} />
            </Th>
            <Th>Description</Th>
            <Th>Requirements</Th>
            <Th
              onClick={() => setFilter('rating')}
              cursor='pointer'
              display={'flex'}
              alignItems={'center'}
            >
              <Text>Rating</Text>
              <BiSort size={'18'} />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* {projects.data.map((project) => ( */}
          {projectsTemplate.map((project) => (
            <Tr
              transition={'all .5s ease'}
              key={project.id}
              cursor='pointer'
              onClick={() => (window.location.href = `/project/${project.id}`)}
              _hover={{
                backgroundColor: 'gray.50',
              }}
            >
              <Td>{project.title}</Td>
              <Td display={{ base: 'none', md: 'table-cell' }}>
                {project.description}
              </Td>
              <Td>
                {project.requirements.map((req) => (
                  <Button key={req} variant='outline' size='sm' mr={2} mb={2}>
                    {req}
                  </Button>
                ))}
              </Td>
              <Td>{project.rating}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Stack my={4} direction={'row'} w={'full'} justify={'space-between'}>
        <Button
          isDisabled={page === 0}
          onClick={() => setPage((prev: any) => (prev || 0) - 1)}
          mr={2}
        >
          Previous
        </Button>
        <Select
          value={perPage as number}
          onChange={(e) => setPerPage(parseInt(e.target.value))}
          maxW='10rem'
          mb={4}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </Select>
        <Button
          isDisabled={(page + 1) * perPage > projects.metadata.total}
          onClick={() => setPage((prev: any) => (prev || 0) + 1)}
        >
          Next
        </Button>
      </Stack>
    </Container>
  );
};
