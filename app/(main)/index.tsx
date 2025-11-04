// import { Image, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import useGlobalStyle from "@/styles/globalStyle";
// import Header from "@/components/ui/header";
// import { useTheme } from "@/hooks/themeContext";
// // import Feather from "@expo/vector-icons/Feather";
// import { useState } from "react";
// import TodoList from "@/components/ui/toDoList";
// import TodoInput from "@/components/ui/todoInput";
// import TodoFooter from "@/components/ui/toDoFooter";

// const Index = ({ onAdd }: { onAdd: (text: string) => void }) => {
//   const styles = useGlobalStyle();
//   const { theme } = useTheme();
//   const [todos, setTodos] = useState<
//     { id: string; text: string; completed: boolean }[]
//   >([]);

//   const addTodo = (text: string) =>
//     setTodos((prev) => [
//       ...prev,
//       { id: Date.now().toString(), text, completed: false },
//     ]);

//   // const clearCompleted = () => {};

//   const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <View style={styles.imgContainer}>
//           <Image
//             source={
//               theme === "light"
//                 ? require("../../assets/images/lightbit.jpg")
//                 : require("../../assets/images/darkbit.jpg")
//             }
//             style={styles.img}
//           />
//         </View>
//         <View style={styles.content}>
//           <Header />

//           {/* Create new task */}
//           <TodoInput onAdd={addTodo} />

//           {/* To do List */}

//           <TodoList todos={todos} setTodos={setTodos} filter={filter} />

//           <TodoFooter filter={filter} setFilter={setFilter} />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Index;

import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useGlobalStyle from "@/styles/globalStyle";
import Header from "@/components/ui/header";
import { useTheme } from "@/hooks/themeContext";
import { useState } from "react";
import TodoList from "@/components/ui/toDoList";
import TodoInput from "@/components/ui/todoInput";
import TodoFooter from "@/components/ui/toDoFooter";

const Index = () => {
  const styles = useGlobalStyle();
  const { theme } = useTheme();

  // Filter state (still local)
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Background image based on theme */}
        <View style={styles.imgContainer}>
          <Image
            source={
              theme === "light"
                ? require("../../assets/images/lightbit.jpg")
                : require("../../assets/images/darkbit.jpg")
            }
            style={styles.img}
          />
        </View>

        {/* Main content */}
        <View style={styles.content}>
          <Header />

          {/* Add new task (Convex mutation handled internally) */}
          <TodoInput />

          {/* Todo list (real-time Convex query + mutations) */}
          <TodoList filter={filter} />

          {/* Footer with filter buttons */}
          <TodoFooter filter={filter} setFilter={setFilter} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
