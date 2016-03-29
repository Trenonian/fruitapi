using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fruitapi.Models
{
    public class Fruit
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Red { get; set; }
        public int Blue { get; set; }
        public int Green { get; set; }
        public string Color
        {
            get
            {
                return string.Format("{0},{1},{2}",Red,Green,Blue);
            }
        }
        public string Description { get; set; }
    }
}
