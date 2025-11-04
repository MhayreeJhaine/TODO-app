import { View, TextInput, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import useGlobalStyle from "@/styles/globalStyle";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const TodoInput = () => {
  const styles = useGlobalStyle();
  const [text, setText] = useState("");

  // 🔥 Convex mutation for adding todos
  const addTodo = useMutation(api.todos.add);

  const handleAdd = async () => {
    if (text.trim()) {
      await addTodo({ text: text.trim() }); // save to backend
      setText(""); // reset input
    }
  };

  return (
    <View>
      <View style={styles.tIC}>
        <Pressable onPress={handleAdd} style={styles.btn}>
          <Feather name="plus" size={18} color="#aaa" />
        </Pressable>
        <TextInput
          style={[styles.tI, styles.defaultFont]}
          placeholder="Create a new todo..."
          placeholderTextColor="#aaa"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAdd}
        />
      </View>
    </View>
  );
};

export default TodoInput;
