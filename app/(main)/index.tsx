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
