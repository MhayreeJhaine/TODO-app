import { Text, View, Pressable, ActivityIndicator } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { LinearGradient } from "expo-linear-gradient";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useGlobalStyle from "@/styles/globalStyle";
import { useMemo } from "react";

type Todo = {
  _id: Id<"todos">;
  text: string;
  completed: boolean;
};

type TodoListProps = {
  filter: "all" | "active" | "completed";
};

const TodoList = ({ filter }: TodoListProps) => {
  const styles = useGlobalStyle();
  const rawTodos = useQuery(api.todos.get);
  const todos = useMemo(() => rawTodos || [], [rawTodos]);
  const isLoading = rawTodos === undefined; // Convex returns undefined initially
  const toggleTodo = useMutation(api.todos.toggle);
  const deleteTodo = useMutation(api.todos.remove);
  const clearCompleted = useMutation(api.todos.clearCompleted);
  const reorderTodos = useMutation(api.todos.reorder);

  const filteredTodos =
    filter === "active"
      ? todos.filter((t) => !t.completed)
      : filter === "completed"
        ? todos.filter((t) => t.completed)
        : todos;

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Todo>) => (
    <Pressable
      onLongPress={drag}
      disabled={isActive}
      style={[styles.tDI, isActive && { opacity: 0.8 }]}
    >
      <Pressable
        onPress={() => toggleTodo({ id: item._id })}
        style={styles.btn}
      >
        {item.completed && (
          <LinearGradient
            colors={["#57DDFF", "#C058F3"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btn}
          >
            <Feather name="check" size={16} color="#fff" />
          </LinearGradient>
        )}
      </Pressable>

      <Text
        style={[
          styles.tDT,
          styles.defaultFont,
          item.completed && styles.tDTComplete,
        ]}
      >
        {item.text}
      </Text>

      <Pressable onPress={() => deleteTodo({ id: item._id })}>
        <Feather name="x" size={18} color="#ccc" />
      </Pressable>
    </Pressable>
  );

  return (
    <View style={[styles.tDC]}>
      <>
        {isLoading ? (
          <>
            <ActivityIndicator size="large" color="#57DDFF" />
            <Text
              style={[
                styles.defaultFont,
                { marginTop: 10, color: "#aaa", textAlign: "center" },
              ]}
            >
              Loading tasks...
            </Text>
          </>
        ) : (
          <DraggableFlatList
            data={filteredTodos}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            onDragEnd={({ data }) => {
              const reordered = data.map((todo, index) => ({
                _id: todo._id,
                order: index,
              }));
              reorderTodos({ todos: reordered });
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 5 }}
            // List footer
            ListFooterComponent={
              <View style={styles.lF}>
                <Text style={[styles.lFT, styles.defaultFont]}>
                  {todos.filter((t) => !t.completed).length} items left
                </Text>
                <Pressable onPress={() => clearCompleted()}>
                  <Text style={[styles.clearCompletedText, styles.defaultFont]}>
                    Clear Completed
                  </Text>
                </Pressable>
              </View>
            }
          />
        )}
      </>
    </View>
  );
};

export default TodoList;
