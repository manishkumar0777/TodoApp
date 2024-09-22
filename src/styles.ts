import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryBox: {
    width: '45%',
    height: 100,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  recentTaskHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  taskCard: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  taskCategory: {
    fontSize: 14,
    color: '#999',
  },
  taskCount: {
    fontSize: 14,
    color: '#bbb',
  },
  addButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  subtaskHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtaskItem: {
    fontSize: 14,
    color: '#444',
  },
});
