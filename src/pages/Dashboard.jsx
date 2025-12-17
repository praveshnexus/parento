import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Heart,
  MessageCircle,
  Plus,
  Trash2,
  Send,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";

export default function Community() {
  const { currentUser, userData } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const snap = await getDocs(query(collection(db, "posts")));
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        likes: d.data().likes || [],
        createdAt: d.data().createdAt?.toDate?.() || new Date(),
      }));
      data.sort((a, b) => b.createdAt - a.createdAt);
      setPosts(data);
    } catch {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!content.trim()) return toast.error("Write something");

    try {
      await addDoc(collection(db, "posts"), {
        userId: currentUser.uid,
        userName: userData?.fullName || "Parent",
        content: content.trim(),
        likes: [],
        createdAt: Timestamp.now(),
      });
      setContent("");
      setShowCreate(false);
      loadPosts();
      toast.success("Post created");
    } catch {
      toast.error("Failed to create post");
    }
  };

  const toggleLike = async (id, likes) => {
    const ref = doc(db, "posts", id);
    const liked = likes.includes(currentUser.uid);

    await updateDoc(ref, {
      likes: liked
        ? arrayRemove(currentUser.uid)
        : arrayUnion(currentUser.uid),
    });

    setPosts((p) =>
      p.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: liked
                ? post.likes.filter((l) => l !== currentUser.uid)
                : [...post.likes, currentUser.uid],
            }
          : post
      )
    );
  };

  const deletePost = async (id, uid) => {
    if (uid !== currentUser.uid) return;
    await deleteDoc(doc(db, "posts", id));
    setPosts((p) => p.filter((x) => x.id !== id));
    toast.success("Post deleted");
  };

  return (
    <div className="space-y-6 pb-24">
      <Toaster />

      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Community</h1>
        <p className="text-sm text-gray-600">
          Share experiences with other parents
        </p>
      </div>

      {/* CREATE */}
      <button
        onClick={() => setShowCreate(true)}
        className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3 text-blue-600 font-medium"
      >
        <Plus size={18} />
        Create post
      </button>

      {/* POSTS */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
          <MessageCircle size={40} className="mx-auto text-gray-400 mb-3" />
          <p className="font-semibold text-gray-800">No posts yet</p>
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl p-4 shadow-sm space-y-3"
          >
            {/* USER */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                  {post.userName?.[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {post.userName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {post.createdAt.toDateString()}
                  </p>
                </div>
              </div>

              {post.userId === currentUser.uid && (
                <button onClick={() => deletePost(post.id, post.userId)}>
                  <Trash2 size={16} className="text-red-400" />
                </button>
              )}
            </div>

            {/* CONTENT */}
            <p className="text-sm text-gray-700 leading-relaxed">
              {post.content}
            </p>

            {/* ACTIONS */}
            <div className="flex items-center gap-6 pt-2 border-t">
              <button
                onClick={() => toggleLike(post.id, post.likes)}
                className={`flex items-center gap-1 text-sm ${
                  post.likes.includes(currentUser.uid)
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                <Heart
                  size={16}
                  className={
                    post.likes.includes(currentUser.uid)
                      ? "fill-current"
                      : ""
                  }
                />
                {post.likes.length}
              </button>

              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MessageCircle size={16} />
                Comments
              </div>
            </div>
          </div>
        ))
      )}

      {/* CREATE MODAL */}
      {showCreate && (
        <>
          <div
            onClick={() => setShowCreate(false)}
            className="fixed inset-0 bg-black/40 z-40"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6">
              <div className="flex justify-between mb-4">
                <h2 className="font-bold text-lg">Create Post</h2>
                <button onClick={() => setShowCreate(false)}>
                  <X />
                </button>
              </div>

              <textarea
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your experience..."
                className="w-full border rounded-lg p-3 text-sm outline-none"
              />

              <button
                onClick={createPost}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Post
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
