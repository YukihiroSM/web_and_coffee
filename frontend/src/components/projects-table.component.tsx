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

import { BiSort } from 'react-icons/bi';
import { Project } from '../types';

type Props = {
  projects: Project[];
  total: number;
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
  total,
}: Props) => {
  return (
    <Container maxWidth={'none'} m={0} p={0} px={{ sm: 5, md: 20 }} mt={8}>
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
            <Th display={{ base: 'none', md: 'table-cell' }}>Description</Th>
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
          {projects &&
            projects.map((project) => (
              <Tr
                key={project.id}
                cursor='pointer'
                onClick={() => {
                  window.location.href = `/project/${project.id}`;
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
          isDisabled={(page + 1) * perPage > total}
          onClick={() => setPage((prev: any) => (prev || 0) + 1)}
        >
          Next
        </Button>
      </Stack>
    </Container>
  );
};
