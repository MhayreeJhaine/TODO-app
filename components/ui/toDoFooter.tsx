import useGlobalStyle from "@/styles/globalStyle";
import { View, Text, Pressable } from "react-native";

const TodoFooter = ({
  filter,
  setFilter,
}: {
  filter: "all" | "active" | "completed";
  setFilter: React.Dispatch<
    React.SetStateAction<"all" | "active" | "completed">
  >;
}) => {
  const styles = useGlobalStyle();

  return (
    <View style={styles.tDFW}>
      <View style={styles.tDFF}>
        {["all", "active", "completed"].map((type) => (
          <Pressable key={type} onPress={() => setFilter(type as any)}>
            <Text
              style={[
                styles.filterText,
                styles.defaultFont,
                filter === type && styles.filterTextActive,
              ]}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={[styles.dragText, styles.defaultFont]}>
        Drag and drop to reorder list
      </Text>
    </View>
  );
};

export default TodoFooter;
