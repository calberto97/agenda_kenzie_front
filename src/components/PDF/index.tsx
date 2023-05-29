import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  Font,
} from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { iContact, iPagination } from '../../pages/Main';
import { api } from '../../services/api';

export const PDFDocument = () => {
  Font.register({
    family: 'Fira Code',
    fonts: [
      {
        src: 'http://fonts.gstatic.com/s/firacode/v21/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sFVfxN87gsj0.ttf',
        fontWeight: 'normal',
      },
      {
        src: 'http://fonts.gstatic.com/s/firacode/v21/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_NprFVfxN87gsj0.ttf',
        fontWeight: 'bold',
      },
    ],
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#c9ada7ff',
      color: '#4a4e69ff',
      fontFamily: 'Fira Code',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    name: {
      fontSize: 22,
      fontWeight: 700,
    },
    title: {
      textAlign: 'center',
      fontSize: 26,
      fontWeight: 700,
      color: '#22223bff',
      marginBottom: 15,
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: 8,
      borderColor: '#4a4e69ff',
      border: '2px solid',
      marginBottom: 10,
    },
    even: {
      backgroundColor: '#f2e9e4ff',
    },
    odd: {
      backgroundColor: '#F5F5F5',
    },
  });

  const [contacts, setContacts] = useState<iContact[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [maxPage, setMaxPage] = useState(2);
  const [perPage, setPerPage] = useState(0);

  const loadContacts = async () => {
    const response = await api.get<iPagination>(
      `client/contacts?page=${pageNum}`
    );
    const all = new Set([...contacts, ...response.data.data]);

    if (pageNum == 1) {
      setContacts(response.data.data);
    } else {
      setContacts([...all]);
    }
    setMaxPage(Math.ceil(response.data.count / 4));
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    (async () => {
      if (pageNum <= maxPage) {
        const token = localStorage.getItem('token');
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        loadContacts();
      }
    })();
  }, [pageNum]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Contatos:</Text>
          {contacts.length &&
            contacts.map((page, index) => {
              if (index % 2 == 0) {
                return (
                  <>
                    <View style={[styles.card, styles.even]}>
                      <Text style={styles.name}>{page.fullName}</Text>
                      <Text>e-mail: {page.email}</Text>
                      <Text>tel: {page.phoneNumber}</Text>
                    </View>
                  </>
                );
              }
              return (
                <>
                  <View style={[styles.card, styles.odd]}>
                    <Text style={styles.name}>{page.fullName}</Text>
                    <Text>e-mail: {page.email}</Text>
                    <Text>tel: {page.phoneNumber}</Text>
                  </View>
                </>
              );
            })}
        </View>
      </Page>
    </Document>
  );
};
