import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
} from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { iContact, iPagination } from '../../pages/Main';
import { api } from '../../services/api';

export const PDFDocument = () => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  // const pageColors = ['#f6d186', '#f67280', '#c06c84'];

  const pages = [
    {
      text: 'First page content goes here...',
    },
    {
      text: 'Second page content goes here...',
      image:
        'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg',
    },
    {
      text: 'Third page content goes here...',
      image:
        'https://s.yimg.com/ny/api/res/1.2/Aj5UoHHKnNOpdwE6Zz9GIQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MA--/https://s.yimg.com/os/creatr-uploaded-images/2023-01/b02a71d0-a774-11ed-bf7f-08714e8ad300',
    },
  ];

  const [contacts, setContacts] = useState<iContact[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [maxPage, setMaxPage] = useState(2);
  const [perPage, setPerPage] = useState(0);

  const loadContacts = async () => {
    // const token = localStorage.getItem('token');

    // api.defaults.headers.common.authorization = `Bearer ${token}`;

    const response = await api.get<iPagination>(
      `client/contacts?page=${pageNum}`
    );

    // const all = new Set([...contacts, ...response.data.data]);
    // setContacts([...all]);

    setMaxPage(Math.ceil(response.data.count / 4));
  };

  useEffect(() => {
    (async () => {
      if (pageNum <= maxPage) {
           const response = await api.get<iPagination>(
             `client/contacts?page=${pageNum}`
           );
        setPerPage(response.data.count);
      }
    })();
  }, [pageNum]);

  return (
    <Document>
      {pages.map((page, index) => {
        return (
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
              <Text>Section #2</Text>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};
