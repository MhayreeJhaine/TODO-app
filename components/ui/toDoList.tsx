import { Text, View, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { LinearGradient } from "expo-linear-gradient";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useGlobalStyle from "@/styles/globalStyle";

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

  const todos = useQuery(api.todos.get) || [];

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
    <View style={styles.tDC}>
      <DraggableFlatList
        data={filteredTodos}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        // onDragEnd={({ data }) => reorderTodos({ todos: data })}
        onDragEnd={({ data }) => {
          const reordered = data.map((todo, index) => ({
            _id: todo._id,
            order: index,
          }));
          reorderTodos({ todos: reordered });
        }}
      />

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
    </View>
  );
};

export default TodoList;

// import { useState, useEffect, useMemo } from "react";
// import { Text, View, Pressable } from "react-native";
// import Feather from "@expo/vector-icons/Feather";
// import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
// import { LinearGradient } from "expo-linear-gradient";
// import { useMutation, useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import useGlobalStyle from "@/styles/globalStyle";

// type Todo = {
//   _id: Id<"todos">;
//   text: string;
//   completed: boolean;
//   order?: number;
// };

// type TodoListProps = {
//   filter: "all" | "active" | "completed";
// };

// const TodoList = ({ filter }: TodoListProps) => {
//   const styles = useGlobalStyle();

//   // Fetch todos from Convex
//   const todosData = useQuery(api.todos.get) || [];
//   const toggleTodo = useMutation(api.todos.toggle);
//   const deleteTodo = useMutation(api.todos.remove);
//   const clearCompleted = useMutation(api.todos.clearCompleted);
//   const reorderTodos = useMutation(api.todos.reorder);

//   // Local state for smooth drag-and-drop
//   const [localTodos, setLocalTodos] = useState<Todo[]>([]);

//   // Initialize localTodos when server data changes
//   useEffect(() => {
//     // Sort by order field for initial render
//     const ordered = [...todosData].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
//     setLocalTodos(ordered);
//   }, [todosData]);

//   // Apply filter
//   const filteredTodos = useMemo(() => {
//     return filter === "active"
//       ? localTodos.filter((t) => !t.completed)
//       : filter === "completed"
//       ? localTodos.filter((t) => t.completed)
//       : localTodos;
//   }, [localTodos, filter]);

//   // Render each todo item
//   const renderItem = ({ item, drag, isActive }: RenderItemParams<Todo>) => (
//     <Pressable
//       onLongPress={drag}
//       disabled={isActive}
//       style={[styles.tDI, isActive && { opacity: 0.8 }]}
//     >
//       <Pressable onPress={() => toggleTodo({ id: item._id })} style={styles.btn}>
//         {item.completed && (
//           <LinearGradient
//             colors={["#57DDFF", "#C058F3"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.btn}
//           >
//             <Feather name="check" size={16} color="#fff" />
//           </LinearGradient>
//         )}
//       </Pressable>

//       <Text style={[styles.tDT, styles.defaultFont, item.completed && styles.tDTComplete]}>
//         {item.text}
//       </Text>

//       <Pressable onPress={() => deleteTodo({ id: item._id })}>
//         <Feather name="x" size={18} color="#ccc" />
//       </Pressable>
//     </Pressable>
//   );

//   return (
//     <View style={styles.tDC}>
//       <DraggableFlatList
//         data={filteredTodos}
//         keyExtractor={(item) => item._id}
//         renderItem={renderItem}
//         onDragEnd={({ data }) => {
//           setLocalTodos(data); // update locally for smooth animation

//           // Update server with new order
//           const reordered = data.map((todo, index) => ({
//             _id: todo._id,
//             order: index,
//           }));
//           reorderTodos({ todos: reordered });
//         }}
//       />

//       <View style={styles.lF}>
//         <Text style={[styles.lFT, styles.defaultFont]}>
//           {localTodos.filter((t) => !t.completed).length} items left
//         </Text>
//         <Pressable onPress={() => clearCompleted()}>
//           <Text style={[styles.clearCompletedText, styles.defaultFont]}>
//             Clear Completed
//           </Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// export default TodoList;
